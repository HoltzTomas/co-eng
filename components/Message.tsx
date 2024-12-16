import { Card, CardContent } from "@/components/ui/card";

export default function Message({role, content} : {role: string, content: string}) {
    return (role === "assistant" || role === "user") && (
    <div>
        {role}:
        {content}
    </div>
);
}