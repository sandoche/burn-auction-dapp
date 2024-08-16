export default function Chip({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex tracking-wide items-center w-fit h-[28px] pl-[10px] pr-2 py-2 rounded-2xl text-sm gap-x-2 [&_.icon]:h-3 [&_.icon]:w-3 transition-all duration-300 ease-in-out bg-opacity-[0.08] dark:bg-opacity-[0.08] hover:bg-opacity-[0.2] hover:dark:bg-opacity-[0.2] focus:bg-opacity-[0.2] focus:dark:bg-opacity-[0.2] bg-success-light dark:bg-success-dark text-success dark:text-success-dark">
      {children}
    </div>
  );
}
