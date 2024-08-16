export const Card = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="bg-evmos-dark p-6 rounded-3xl">{children}</div>;
};
