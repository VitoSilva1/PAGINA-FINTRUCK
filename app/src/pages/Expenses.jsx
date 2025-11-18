import { useMemo, useState } from 'react';

const categories = ['Hogar', 'Alimentación', 'Transporte', 'Educación', 'Entretenimiento', 'Otros'];

const Expenses = () => {
  const [formValues, setFormValues] = useState({
    description: '',
    amount: '',
    category: categories[0],
    date: ''
  });
  const [expenses, setExpenses] = useState([]);

  const totalSpent = useMemo(
    () => expenses.reduce((acc, expense) => acc + Number(expense.amount || 0), 0),
    [expenses]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formValues.description || !formValues.amount) return;

    setExpenses((prev) => [
      ...prev,
      {
        ...formValues,
        id: crypto.randomUUID()
      }
    ]);

    setFormValues((prev) => ({ ...prev, description: '', amount: '', date: '' }));
  };

  const handleClear = () => setExpenses([]);

  return (
    <section className="container py-5">
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="card-title h4 mb-4">Registrar gasto</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="description">
                    Descripción
                  </label>
                  <input
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Ej: Pago de arriendo"
                    required
                    type="text"
                    value={formValues.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="amount">
                    Monto
                  </label>
                  <input
                    className="form-control"
                    id="amount"
                    min="0"
                    name="amount"
                    placeholder="0"
                    required
                    type="number"
                    value={formValues.amount}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="category">
                    Categoría
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={formValues.category}
                    onChange={handleChange}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="date">
                    Fecha
                  </label>
                  <input
                    className="form-control"
                    id="date"
                    name="date"
                    type="date"
                    value={formValues.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button className="btn btn-info text-white" type="submit">
                    Agregar gasto
                  </button>
                  <button className="btn btn-outline-secondary" type="button" onClick={handleClear}>
                    Limpiar lista
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="card-title h4 mb-0">Gastos registrados</h2>
                <span className="badge bg-info text-dark fs-6">
                  Total: ${totalSpent.toLocaleString('es-CL')}
                </span>
              </div>

              {expenses.length === 0 ? (
                <p className="text-muted mb-0">Aún no registras gastos. ¡Comienza agregando el primero!</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Fecha</th>
                        <th className="text-end">Monto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map((expense) => (
                        <tr key={expense.id}>
                          <td>{expense.description}</td>
                          <td>{expense.category}</td>
                          <td>{expense.date ? new Date(expense.date).toLocaleDateString('es-CL') : '-'}</td>
                          <td className="text-end">${Number(expense.amount).toLocaleString('es-CL')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expenses;
