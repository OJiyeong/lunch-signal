import { useState } from "react";
import { Button } from "./button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Input } from "./input";
import { Label } from "./label";


interface JoinPostModalProps {
    menu: string;
    count: number;
    maxCount: number;
    onJoin: (name: string) => void;
}

export default function JoinModal({ menu, maxCount, count, onJoin }: JoinPostModalProps) {

    const [open, setOpen] = useState(false);

    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('참여자:', { name });

        onJoin(name); 
        // 입력 초기화
        setName('');

        // 모달 닫기
        setOpen(false);
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setOpen(true)}>참가하기</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="mb-5">점심 모임 참가</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="join-menu-1">{menu}</Label>
                            <Label htmlFor="join-count-1">현재 {count}/{maxCount}명 참가중</Label>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="join-name-1">이름</Label>
                            <Input id="join-name-1" name="join-name" placeholder="이름을 입력하세요"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="grid gap-3">
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={!name}>Add</Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    )
}