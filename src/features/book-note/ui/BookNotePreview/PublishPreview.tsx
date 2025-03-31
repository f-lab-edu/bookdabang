import { memo } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';

interface PublishPreviewProps {
  publish: boolean;
}

function PublishPreview({ publish }: PublishPreviewProps) {
  return (
    <div className="flex items-center">
      <Badge
        variant="outline"
        className="flex items-center gap-1"
      >
        {publish ? (
          <>
            <Unlock className="size-3" />
            공개
          </>
        ) : (
          <>
            <Lock className="size-3" />
            비공개
          </>
        )}
      </Badge>
    </div>
  );
}

export default memo(PublishPreview);
