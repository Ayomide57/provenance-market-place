import MarketHeader from "@/components/MarketHeader";

function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-black">
      <MarketHeader />
      <main className="bg-black">{children}</main>
    </div>
  );
}

export default MarketLayout;