import { useState } from "react";
import "../contact.css";
import { Form, Button, Modal, Container, Row, Col } from "react-bootstrap";

const ContactForm = () => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    celular: "",
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;

    if (formElement.checkValidity() === false || !validateEmail(form.correo)) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(false);
    localStorage.setItem("contactoData", JSON.stringify(form));
    setShow(true);
    setForm({ nombre: "", correo: "", celular: "", mensaje: "" });
  };

  return (
    <Container className="my-5">
      <h2 className="contacto_titulo text-center mb-4">Contáctanos</h2>
      <Row>
        <Col md={6}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ingresa tu nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="correo">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="ejemplo@correo.com"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                isInvalid={validated && !validateEmail(form.correo)}
              />
              <Form.Control.Feedback type="invalid">
                Ingresa un correo válido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="celular">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                required
                type="tel"
                placeholder="Ingrese su celular"
                name="celular"
                value={form.celular}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="mensaje">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={4}
                placeholder="Escribe tu mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" className="colorboton mt-3">
              Enviar mensaje
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <h5 className="textoazul mb-3">
            Ubicación: Av. Ramón Picarte 1198, Valdivia
          </h5>
          <div className="embed-responsive embed-responsive-4by3">
            <iframe
              className="embed-responsive-item"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3122.641832129597!2d-73.23947192420253!3d-39.81961355767986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9616362f24dfd7c7%3A0x73f3502ffb122d31!2sAv.%20Ram%C3%B3n%20Picarte%201198%2C%20Valdivia%2C%20Los%20R%C3%ADos!5e0!3m2!1ses-419!2scl!4v1712399200000!5m2!1ses-419!2scl"
              allowFullScreen
              loading="lazy"
              style={{ width: "100%", height: "300px", border: 0 }}
            ></iframe>
          </div>
        </Col>
      </Row>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">¡Mensaje enviado!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Gracias por contactarte con Moda Sur. Te responderemos pronto.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={() => setShow(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ContactForm;
