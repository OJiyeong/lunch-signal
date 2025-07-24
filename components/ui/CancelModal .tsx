import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { Label } from "./label";
import { Input } from "./input";

interface CancelModalProps {
    menu: string;
    onCancel: (name: string) => boolean;
}

export default function CancelModal({ menu, onCancel }: CancelModalProps) {

    const [open, setOpen] = useState(false);
    const [inputName, setInputName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = onCancel(inputName);
        if (!success) {
            alert('참여자가 아닙니다.');
            return;
        }
        setInputName('');
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" onClick={() => setOpen(true)}>취소하기</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="mb-5">참가 취소</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <Label>🍱 메뉴명: {menu}</Label>
                        <Label>참가를 취소하려면 이름을 입력하세요</Label>
                        <Input
                            placeholder="이름 입력"
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}
                        />
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>

                    <DialogFooter className="mt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>닫기</Button>
                        <Button type="submit" variant="destructive" disabled={!inputName}>취소하기</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}