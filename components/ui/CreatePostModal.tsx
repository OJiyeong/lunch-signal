import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./select";
import { useState } from "react";

interface CreatePostModalProps {
    onCreate: (menu: string, max: number, name: string) => void;
}

export default function CreatePostModal({ onCreate }: CreatePostModalProps) {
    console.log('CreatePostModal.tsx');

    const [menu, setMenu] = useState('');
    const [name, setName] = useState('');
    const [max, setCount] = useState('');

    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 폼 기본 제출 막기(유효성 검증 X라 log는 찍힘)
        console.log('추가됨:', { menu, name, max });
        // 여기서 서버 전송 또는 상태 초기화 가능

        onCreate(menu, parseInt(max), name);

        // 입력 초기화
        setMenu('');
        setName('');
        setCount('');

        // 모달 닫기
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setOpen(true)}>글쓰기</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="mb-5">새 점심 모임 만들기</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="menu-1">메뉴</Label>
                            <Input id="menu-1" name="menu" placeholder="예: 김치찌개, 파스타..."
                                value={menu} onChange={(e) => setMenu(e.target.value)} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">이름</Label>
                            <Input id="name-1" name="name" placeholder="이름을 입력하세요"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="count-1">인원 수</Label>
                            <Select onValueChange={setCount}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="인원수" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel></SelectLabel>
                                        <SelectItem value="2">2명</SelectItem>
                                        <SelectItem value="3">3명</SelectItem>
                                        <SelectItem value="4">4명</SelectItem>
                                        <SelectItem value="5">5명</SelectItem>
                                        <SelectItem value="6">6명</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={!menu || !name || !max}>Add</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}