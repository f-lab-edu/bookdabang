import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import ReviewField from './ReviewField';

export default function ReviewStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>독후감</CardTitle>
      </CardHeader>
      <CardContent>
        <ReviewField />
      </CardContent>
    </Card>
  );
}
