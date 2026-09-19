const TicketService = require("../services/TicketService");
const service = new TicketService();

exports.create = (req, res) => {
  const ticket = service.createTicket(req.body);
  res.status(201).json(ticket);
};

// Reemplaza el método list por este:
exports.list = (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = service.list(page, limit);
    res.status(200).json(result);
  } catch (err) {
    next(err); // Pasa el error al middleware errorHandler
  }
};

exports.assign = (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const ticket = service.assignTicket(id, user);
  if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
  res.status(200).json(ticket);
};

exports.changeStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const ticket = service.changeStatus(id, status);
  if (!ticket) return res.status(404).json({ error: "Ticket no encontrado" });
  res.status(200).json(ticket);
};

exports.delete = (req, res) => {
  try {
    service.deleteTicket(req.params.id);
    res.json({ message: "Ticket eliminado correctamente" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

// Agrega esta función al final de TicketController.js:
exports.getNotifications = (req, res, next) => {
  try {
    const { id } = req.params;
    const notifications = service.getTicketNotifications(id);
    res.status(200).json(notifications);
  } catch (err) {
    next(err);
  }
};
