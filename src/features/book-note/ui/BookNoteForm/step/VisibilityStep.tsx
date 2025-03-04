import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { Switch } from '@/shared/ui/switch';

export default function VisibilityStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>노트 공개 설정</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Switch
            id="visibility"
            checked
          />
          <Label htmlFor="visibility">전체 공개</Label>
        </div>
      </CardContent>
    </Card>
  );
}
