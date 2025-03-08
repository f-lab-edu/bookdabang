import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import QuotesField from './QuotesField';

export default function QuotesStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>기억에 남는 문구</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <QuotesField />
      </CardContent>
    </Card>
  );
}
