import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import PublishField from './PublishField';

export default function PublishStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>노트 공개 설정</CardTitle>
      </CardHeader>
      <CardContent>
        <PublishField />
      </CardContent>
    </Card>
  );
}
