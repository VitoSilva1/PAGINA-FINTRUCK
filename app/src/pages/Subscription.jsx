const plans = [
  {
    name: 'Básico',
    price: '$2.990',
    period: '/ mes',
    highlight: 'bg-primary text-white',
    features: ['1 usuario', 'Acceso limitado', 'Soporte estándar'],
    variant: 'outline-primary'
  },
  {
    name: 'Pro',
    price: '$5.990',
    period: '/ mes',
    highlight: 'bg-success text-white',
    features: ['5 usuarios', 'Acceso completo', 'Soporte prioritario'],
    variant: 'success'
  },
  {
    name: 'Gold',
    price: '$6.990',
    period: '/ mes',
    highlight: 'bg-warning text-dark',
    features: ['Usuarios ilimitados', 'Acceso total', 'Soporte prioritario'],
    variant: 'warning'
  }
];

const Subscription = () => (
  <section className="py-5 bg-light flex-fill">
    <div className="container">
      <h1 className="text-center mb-5">Planes de Suscripción</h1>
      <div className="row g-4 text-center">
        {plans.map((plan) => (
          <div className="col-md-4" key={plan.name}>
            <div className="card shadow-sm border-0 h-100">
              <div className={`card-header ${plan.highlight}`}>
                <h4 className="my-0">{plan.name}</h4>
              </div>
              <div className="card-body d-flex flex-column">
                <h2 className="card-title pricing-card-title">
                  {plan.price} <small className="text-muted">{plan.period}</small>
                </h2>
                <ul className="list-unstyled mt-3 mb-4">
                  {plan.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
                <button type="button" className={`btn btn-${plan.variant} w-100 mt-auto`}>
                  Seleccionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Subscription;
