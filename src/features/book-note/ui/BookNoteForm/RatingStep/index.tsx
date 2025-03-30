import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import RecommendField from './RecommendField';
import RatingField from './RatingField';

export default function RatingStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>책 평가</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RecommendField />
        <RatingField />
      </CardContent>
    </Card>
  );
}
