import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SearchBreach = () => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    credit_card: "",
  });

  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const params = new URLSearchParams();
    if (form.email) params.append("email", form.email);
    if (form.phone) params.append("phone", form.phone);
    if (form.credit_card) params.append("credit_card", form.credit_card);

    if (!params.toString()) {
      setError("Please enter at least one search field.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/search?${params.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setResults(data);
      } else {
        setError(data.error || "Error fetching data");
      }
    } catch (err) {
      setError("Failed to fetch from server.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Search Breach Data</h2>

      <form onSubmit={handleSearch} className="space-y-4">
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="credit_card"
          placeholder="Credit Card"
          value={form.credit_card}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      <div className="mt-6 space-y-4">
        {results.length > 0 && <h3 className="text-xl font-medium">Results:</h3>}
        {results.map((item, idx) => (
          <div key={idx} className="border p-4 rounded bg-gray-100 text-sm overflow-x-auto">
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBreach;
