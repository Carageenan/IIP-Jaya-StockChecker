import { useEffect, useState } from "react";
import axios from "axios";

export default function TableStock() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    async function getStocks() {
      const stocks = await axios.get("http://localhost:4000/stocks");
      setData(stocks.data.data);
    }
    getStocks();
  }, []);

  const printTable = () => {
    let counter = 1;
    if (!data) {
      return <progress className="progress w-56"></progress>;
    }
    return data.map((stock) => {
      return (
        <tr key={stock._id} style={{ textAlign: "center" }}>
          <td>{counter++}</td>
          <td>{stock.itemName}</td>
          <td>{stock.totalStock} Kg</td>
        </tr>
      );
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full flex align-middle">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th></th>
            <th>Item Name</th>
            <th>Total Stock</th>
          </tr>
        </thead>
        <tbody>{printTable()}</tbody>
      </table>
    </div>
  );
}
