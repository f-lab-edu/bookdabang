import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import VisibilityField from './VisibilityField';

export default function VisibilityStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>노트 공개 설정</CardTitle>
      </CardHeader>
      <CardContent>
        <VisibilityField />
      </CardContent>
    </Card>
  );
}
