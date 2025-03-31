import { memo } from 'react';
import { Quote } from 'lucide-react';
import { Card, CardContent, CardTitle, CardHeader } from '@/shared/ui/card';
import { BookNoteFormSchema } from '../../model/book-note-form-schema';

interface QuotesPreviewProps {
  quotes: BookNoteFormSchema['quotes'];
}

function QuotesPreview({ quotes }: QuotesPreviewProps) {
  if (quotes.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Quote className="mr-2 size-5" />
          기억에 남는 문구
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className="border-l-2 border-primary pl-4"
            >
              <blockquote className="italic">{quote.text}</blockquote>
              {quote.page && <p className="mt-1 text-sm text-muted-foreground">Page {quote.page}</p>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(QuotesPreview);
