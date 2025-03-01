import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Textarea } from '@/shared/ui/textarea';

export default function ReviewStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>독후감</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          id="content"
          name="content"
          className="min-h-[200px]"
          placeholder="독후감을 작성해 보세요!"
        />
      </CardContent>
    </Card>
  );
}
