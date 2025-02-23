import { Button } from '@/shared/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';

interface Quote {
  text: string;
  page: string;
}

const quotes: Quote[] = [
  { text: '기억에 남는 문구 1', page: '100' },
  { text: '기억에 남는 문구 2', page: '200' },
];

export default function QuotesStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>기억에 남는 문구</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {quotes.map((quote: Quote, index: number) => (
          <div
            key={index}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <Label htmlFor={`quote-${index}`}>문구 {index + 1}</Label>
              <Button
                type="button"
                variant="destructive"
                size="sm"
              >
                삭제
              </Button>
            </div>
            <Textarea
              id={`quote-${index}`}
              defaultValue={quote.text}
              placeholder="기억에 남는 문구를 입력해 주세요"
            />
            <Input
              type="number"
              defaultValue={quote.page}
              placeholder="페이지 번호"
              className="w-32"
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
        >
          문구 추가
        </Button>
      </CardContent>
    </Card>
  );
}
