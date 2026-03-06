import { useMemo, useState } from "react";
import Navbar from "./components/common/Navbar";
import SearchBar from "./components/common/SearchBar";
import Button from "./components/common/Button";
import Loader from "./components/common/Loader";
import Modal from "./components/common/Modal";
import Toast from "./components/common/Toast";
import Footer from "./components/common/Footer";
import "./App.css";

const farms = [
  "Emerald Grove Farm",
  "Cedar Valley Retreat",
  "Pine Creek Ranch",
  "Mossy Meadow Lodge",
  "Riverstone Orchard",
  "Evergreen Hills Stay",
];

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", type: "success" });

  const filteredFarms = useMemo(
    () => farms.filter((farm) => farm.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const runFakeSync = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast({
        open: true,
        message: "Farm list synchronized successfully.",
        type: "success",
      });
    }, 1500);
  };

  return (
    <div className="ff-page">
      <Navbar />

      <main className="ff-main">
        <section className="ff-card">
          <h1>FunFarm Explorer</h1>
          <p>Browse and manage farmhouse options in a dark-green interface.</p>

          <SearchBar value={query} onChange={setQuery} placeholder="Search farms by name..." />

          <div className="ff-actions">
            <Button onClick={runFakeSync} disabled={loading}>
              {loading ? "Syncing..." : "Sync Farms"}
            </Button>
            <Button variant="ghost" onClick={() => setShowModal(true)}>
              Open Details
            </Button>
          </div>

          {loading && <Loader text="Refreshing farm inventory..." />}

          <ul className="ff-list">
            {filteredFarms.map((farm) => (
              <li key={farm}>{farm}</li>
            ))}
            {!filteredFarms.length && <li>No farm found for "{query}"</li>}
          </ul>
        </section>
      </main>

      <Modal isOpen={showModal} title="Farm Overview" onClose={() => setShowModal(false)}>
        <p>Current visible farms: {filteredFarms.length}</p>
        <p>This modal closes on backdrop click, close button, or by action below.</p>
        <Button onClick={() => setShowModal(false)}>Close</Button>
      </Modal>

      <Toast
        isOpen={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />

      <Footer />
    </div>
  );
}

export default App;
