import Header from "@/components/headers/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
    </section>
  );
};

export default Layout;
