import { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionForm() {
  const [items, setItems] = useState([]);
  const [Transaction, setTransaction] = useState({
    buyerName: "",
    items: [],
    totalTransactionPrice: 0,
  });
  const [formData, setFormData] = useState([
    {
      itemName: "",
      itemId: "",
      totalItem: "",
      pricePerItem: 0,
      totalPrice: 0,
    },
    0,
    "",
  ]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  useEffect(() => {
    async function getItems() {
      const items = await axios.get("http://localhost:4000/items");
      setItems(items.data.data);
    }
    getItems();
  }, []);
  const makeOptions = () => {
    if (!items) {
      return <option>loading..</option>;
    } else {
      return items.map((item) => {
        return (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        );
      });
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "itemName") {
      let newInput = [...formData];
      newInput[1] = e.target.value;
      items.forEach((item) => {
        if (item._id === e.target.value) {
          newInput[0].itemId = item._id;
          newInput[0].itemName = item.name;
          newInput[0].pricePerItem = item.price;
        }
      });
      setFormData(newInput);
    } else if (e.target.name === "totalItem") {
      let newInput = [...formData];
      newInput[0].totalItem = Number(e.target.value);
      setFormData(newInput);
    } else if (e.target.name === "buyerName") {
      let newInput = [...formData];
      newInput[2] = e.target.value;
      setFormData(newInput);
    }
  };
  const addTransaction = () => {
    let newTransaction = { ...Transaction };
    newTransaction.buyerName = formData[2];
    const totalPricePerItem = formData[0].totalItem * formData[0].pricePerItem;
    let newItem = { ...formData[0] };
    newItem.totalPrice = totalPricePerItem;
    newTransaction.items.push(newItem);
    setTransaction(newTransaction);
    setFormData([
      {
        itemName: "",
        itemId: "",
        totalItem: "",
        pricePerItem: 0,
        totalPrice: 0,
      },
      0,
      formData[2],
    ]);
  };
  const printTable = () => {
    if (Transaction.items.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="text-center">
            Belum ada item ditambahkan
          </td>
        </tr>
      );
    } else {
      let counter = 0;
      return Transaction.items.map((item) => {
        counter++;
        return (
          <tr key={item.itemId} style={{ textAlign: "center" }}>
            <td>{counter}</td>
            <td>{item.itemName}</td>
            <td>{item.totalItem}</td>
            <td>{item.pricePerItem.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
            <td>{item.totalPrice.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
          </tr>
        );
      });
    }
  };
  const printTotal = () => {
    if (Transaction.items.length === 0) {
      return;
    } else {
      let total = 0;
      Transaction.items.forEach((item) => {
        total += item.totalPrice;
      });
      return (
        <tr style={{ textAlign: "center" }}>
          <td colSpan="4">Total</td>
          <td>{total.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
        </tr>
      );
    }
  };
  return (
    <div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-black">Nama Pembeli</span>
        </label>
        <label className="input-group">
          <span>Nama</span>
          <input name="buyerName" onChange={handleChange} type="text" placeholder="Nama pembeli" className="input input-bordered" />
        </label>
      </div>
      <table className="table w-full flex align-middle mt-4">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th></th>
            <th>Item Name</th>
            <th>Total Item</th>
            <th>Price Per Item</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {printTable()}
          {printTotal()}
        </tbody>
      </table>
      <div className="overflow-y-auto flex flex-col items-center mt-4">
        <div className="form-control">
          <h3 className="text-black text-center">Item yang dibeli</h3>
          <div className="input-group w-full">
            <select name="itemName" onChange={handleChange} value={formData[1]} className="select select-bordered">
              <option disabled value={0}>
                Pilih Item
              </option>
              {makeOptions()}
            </select>
            <button className="btn">Jenis Item</button>
          </div>
        </div>
        <div className="form-control pt-4">
          <label className="input-group">
            <span>Jumlah</span>
            <input
              name="totalItem"
              onChange={handleChange}
              value={formData[0].totalItem}
              type="number"
              placeholder="Jumlah Item"
              className="input input-bordered"
            />
          </label>
        </div>
        <button onClick={() => addTransaction()} className="btn btn-primary w-40 mt-4">
          Tambah Item
        </button>
        <button className="btn w-40 mt-4">Buat Transaksi</button>
      </div>
    </div>
  );
}
