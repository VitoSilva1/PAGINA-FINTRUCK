import React, { useEffect, useState } from "react";
import { enviarGastos } from "../services/expense";

const expenseTypes = [
  "Servicios básicos",
  "Supermercado",
  "Tarjetas de crédito",
  "Deudas bancarias",
  "Otras deudas"
];

export default function ExpensesRedesign() {
  const makeId = () =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  const basicServices = [
    "Luz",
    "Agua",
    "Tv-Cable",
    "Internet",
    "Teléfono",
    "Tv + Internet",
    "Tv + Internet + Teléfono",
    "Gas"
  ];

  const [selectedType, setSelectedType] = useState("");
  const [userId, setUserId] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }
    const storedId = window.localStorage.getItem("fintrackUserId");
    return storedId ? Number(storedId) : null;
  });
  const [rows, setRows] = useState([
    { id: makeId(), name: "", amount: 0, quantity: 1, installments: 1 }
  ]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }
    const syncUserId = () => {
      const storedId = window.localStorage.getItem("fintrackUserId");
      setUserId(storedId ? Number(storedId) : null);
    };
    window.addEventListener("storage", syncUserId);
    return () => window.removeEventListener("storage", syncUserId);
  }, []);

  const isBasicService = selectedType === "Servicios básicos";
  const isSupermarket = selectedType === "Supermercado";

  const total = rows.reduce(
    (acc, row) => acc + Number(row.amount || 0) * Number(row.quantity || 1),
    0
  );

  const handleChange = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
            ...row,
            [field]: field === "name" ? value : Number(value || 0)
          }
          : row
      )
    );
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: makeId(), name: "", amount: 0, quantity: 1, installments: 1 }
    ]);
  };

  const removeRow = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };
  const buildExpensePayload = () => {
    const items = rows
      .filter((row) => row.name && row.amount)
      .map((row) => ({
        name: row.name,
        monto: Number(row.amount),
        cantidad: Number(row.quantity || 1),
        cuotas: Number(row.installments || 1),
        total: Number(row.amount) * Number(row.quantity || 1)
      }));

    if (!selectedType || !items.length || !userId) {
      return null;
    }

    return {
      user_id: Number(userId),
      category_label: selectedType,
      items
    };
  };

  const guardarGasto = async () => {
    if (!userId) {
      alert("Debes iniciar sesión para registrar tus gastos.");
      return;
    }
    const payload = buildExpensePayload();
    if (!payload) {
      alert("Completa al menos un gasto antes de guardar.");
      return;
    }
    try {
      await enviarGastos(payload);
      alert("Gastos enviados correctamente.");
    } catch (error) {
      console.error("Error al enviar gastos:", error);
      alert(error.message || "Ocurrió un error al guardar los gastos.");
    }
  };
  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-4">Registro de Gastos</h1>

      <div className="mb-4">
        <label className="form-label fw-semibold">Selecciona el tipo de gasto</label>
        <select
          className="form-select shadow-sm"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">-- Selecciona una opción --</option>
          {expenseTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {selectedType && (
        <div className="card shadow-lg border-0 mb-5">
          <div className="card-body p-4">
            <h2 className="h4 text-primary fw-bold mb-3">{selectedType}</h2>

            <div className="row mb-2 fw-semibold text-secondary px-2 gx-2">
              <div className="col-12 col-lg-4">Gasto</div>
              <div className="col-6 col-lg-2">Precio</div>
              {!isBasicService && (
                <div className="col-4 col-lg-2">Cantidad</div>
              )}
              {!isSupermarket || !isBasicService && (
                <div className="col-4 col-lg-2">Cuotas</div>
              )}
              <div className="col-2 d-none d-lg-block">Acción</div>
            </div>

            <div className="d-flex flex-column gap-2">
              {rows.map((row) => (
                <div key={row.id} className="row g-2 align-items-center p-1">

                  <div className="col-12 col-lg-4">
                    {isBasicService ? (
                      <select
                        className="form-select"
                        value={row.name}
                        onChange={(e) => handleChange(row.id, "name", e.target.value)}
                      >
                        <option value="">Seleccionar servicio…</option>
                        {basicServices.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej: producto, deuda…"
                        value={row.name}
                        onChange={(e) => handleChange(row.id, "name", e.target.value)}
                      />
                    )}
                  </div>

                  <div className="col-6 col-lg-2">
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        value={row.amount}
                        placeholder="0"
                        onChange={(e) => handleChange(row.id, "amount", e.target.value)}
                      />
                    </div>
                  </div>

                  {!isBasicService && (
                    <div className="col-4 col-lg-2">
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        value={row.quantity}
                        onChange={(e) => handleChange(row.id, "quantity", e.target.value)}
                      />
                    </div>
                  )}

                  {!isSupermarket || !isBasicService && (
                    <div className="col-4 col-lg-2">
                      <input
                        type="number"
                        min="1"
                        disabled={isBasicService}
                        className="form-control"
                        value={row.installments}
                        onChange={(e) => handleChange(row.id, "installments", e.target.value)}
                      />
                    </div>
                  )}

                  <div className="col-2 d-flex gap-2">
                    <button className="btn btn-secondary  w-50" onClick={addRow}>+</button>
                    {rows.length > 1 && (
                      <button className="btn btn-danger w-100" onClick={() => removeRow(row.id)}>−</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 d-flex justify-content-between align-items-center">

              <div className="p-2 bg-primary bg-opacity-10 rounded-3 d-flex justify-content-between align-items-center shadow-sm flex-grow-1" style={{ width: "80%" }}>
                <span className="fw-semibold fs-5">Total:</span>
                <span className="fs-3 fw-bold text-primary">${total.toLocaleString("es-CL")}</span>
              </div>

              <div className="m-3 bg-primary bg-opacity-10 rounded-3 d-flex justify-content-between align-items-center shadow-sm" style={{ width: "15%" }}>
                <button
                  className="p-3 btn btn-primary fw-semibold w-100"
                  onClick={guardarGasto}
                >
                  Guardar gasto
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
