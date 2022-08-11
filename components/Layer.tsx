export default function Layer({ children, title }: ILayer) {
  return (
    <div className="bg-amber-500 px-4 pt-3 pb-20 h-full">
      <div className="w-full text-center font-bold text-3xl text-white">
        {title}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

interface ILayer {
  children: React.ReactNode;
  title: string;
}
