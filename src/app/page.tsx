import { getTotalSales } from "~/lib/actions/action";

export default async function Home() {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  return (
    <div>
      <h1 className="text-red-500 ">Hello, world!</h1>
      <h2>{totalRevenue}</h2>
    </div>
  );
}
