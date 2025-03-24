import { useCallback, useEffect, useMemo } from 'react';
import { FieldValues, useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { isNil } from 'es-toolkit';
import { isEmpty } from '@/shared/lib/string-utils';

export type PersistentStorage = 'local' | 'session';

export interface UsePersistentFormProps<TFieldValues extends FieldValues = FieldValues, TContext = unknown>
  extends UseFormProps<TFieldValues, TContext> {
  storage?: PersistentStorage;
  storageKey: string;
}

export interface UsePersistentFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues | undefined = undefined,
> extends UseFormReturn<TFieldValues, TContext, TTransformedValues> {
  clearPersistentData: () => void;
}

const isServer = typeof window === 'undefined';

export function usePersistentForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  storage = 'local',
  storageKey,
  ...formProps
}: UsePersistentFormProps<TFieldValues, TContext>): UsePersistentFormReturn<
  TFieldValues,
  TContext,
  TTransformedValues
> {
  const isStorageKeyEmpty = useMemo(() => isEmpty(storageKey), [storageKey]);
  const storageApi = useMemo(() => {
    if (isServer) return null;
    return storage === 'local' ? localStorage : sessionStorage;
  }, [storage]);

  const defaultValues = useMemo(() => {
    if (isServer || isStorageKeyEmpty) return formProps.defaultValues;

    const saved = storageApi?.getItem(storageKey);

    if (isNil(saved)) return formProps.defaultValues;

    return JSON.parse(saved);
  }, [formProps.defaultValues, isStorageKeyEmpty, storageKey, storageApi]);

  const form = useForm<TFieldValues, TContext, TTransformedValues>({
    ...formProps,
    defaultValues,
  });

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isStorageKeyEmpty) return;
      storageApi?.setItem(storageKey, JSON.stringify(form.getValues()));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [form, isStorageKeyEmpty, storage, storageApi, storageKey]);

  const clearPersistentData = useCallback(() => {
    if (isStorageKeyEmpty) return;
    storageApi?.removeItem(storageKey);
  }, [isStorageKeyEmpty, storageApi, storageKey]);

  return { ...form, clearPersistentData };
}
