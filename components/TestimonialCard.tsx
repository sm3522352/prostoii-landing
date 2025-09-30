import Card from "./Card";

export default function TestimonialCard({ before, after, author }:{before:string; after:string; author:string}){
  return (
    <Card className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-neutral-500 mb-1">До</div>
          <div className="text-sm bg-neutral-50 p-3 rounded-sm">{before}</div>
        </div>
        <div>
          <div className="text-xs text-neutral-500 mb-1">После</div>
          <div className="text-sm bg-primary-50 p-3 rounded-sm">{after}</div>
        </div>
      </div>
      <div className="text-xs text-neutral-500 mt-3">— {author}</div>
    </Card>
  );
}
