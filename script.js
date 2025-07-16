// Malla interactiva – Negocios Internacionales UV
// Al aprobar un ramo se habilitan automáticamente los que dependen de él.

document.addEventListener("DOMContentLoaded", () => {
  // --- Lista completa de ramos -------------------------------------------
  const courses = [
    "Introducción a los negocios internacionales",
    "Gestión de organizaciones",
    "Informática para los negocios",
    "Álgebra",
    "Política y formación ciudadana",
    "Autoconocimiento",
    "Habilidades comunicacionales",
    "Historia de las relaciones internacionales",
    "Geografía política y económica",
    "Psicología social y organizacional",
    "Sistemas de información 1",
    "Calculo 1",
    "Ingles 1",
    "Personas y organizaciones",
    "Marketing estratégico",
    "Calculo 2",
    "Contabilidad financiera",
    "Derecho empresarial",
    "Ingles 2",
    "Simulación de negocios",
    "Marketing operativo",
    "Estadística para los negocios",
    "Contabilidad administrativa",
    "Microeconomía",
    "Ingles 3",
    "Sistemas de información 2",
    "Métodos cuantitativos",
    "Gestión financiera",
    "Comercio internacional",
    "Taller perfil uv 1",
    "Ingles 4",
    "Practicas intermedias",
    "Teoría del conflicto y negociación",
    "Gestión de operaciones",
    "Macroeconomía",
    "Derecho comercial internacional",
    "Gestión aduanera y documental",
    "Taller perfil uv 2",
    "Academic communicational english",
    "Negocios internacionales",
    "Finanzas corporativas",
    "Economía internacional",
    "Logística y seguros internacionales",
    "Metodología de investigación de los negocios internacionales",
    "Taller perfil uv 3",
    "English for internatational managent",
    "Integración comercial internacional",
    "Marketing internacional y global",
    "Formulación y evaluación de proyectos",
    "Transporte y distribución internacional",
    "Gestión bancaria internacional",
    "English for foreing trade",
    "Simulación de negocios 2",
    "Dirección y gestión internacional",
    "Electivo de actualización",
    "Finanzas internacionales",
    "Análisis de entorno y coyuntura",
    "Formación ciudadana global",
    "Curso 1 de especialización",
    "Práctica profesional",
    "Seminario de título",
    "Curso 2 de especialización"
  ];
 // --- Relación de requisitos (key = ramo desbloqueado, value = array de requisitos) ----
  const prereq = {};
  function slug(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
   function addPrereq(target, requirements) {
    prereq[slug(target)] = requirements.map(slug);
  }
  // 1º año
  addPrereq("Comercio internacional", ["Introducción a los negocios internacionales"]);
  addPrereq("Personas y organizaciones", ["Gestión de organizaciones"]);
  addPrereq("Sistemas de información 1", ["Informática para los negocios"]);
  addPrereq("Calculo 1", ["Álgebra"]);
  addPrereq("Psicología social y organizacional", ["Política y formación ciudadana"]);
  // 2º año
  addPrereq("Teoría del conflicto y negociación", ["Psicología social y organizacional"]);
  addPrereq("Sistemas de información 2", ["Sistemas de información 1"]);
  addPrereq("Calculo 2", ["Calculo 1"]);
  addPrereq("Ingles 2", ["Ingles 1"]);
  addPrereq("Dirección y gestión internacional", ["Personas y organizaciones"]);
  addPrereq("Marketing operativo", ["Marketing estratégico"]);
  addPrereq("Estadística para los negocios", ["Calculo 2"]);
  addPrereq("Contabilidad administrativa", ["Contabilidad financiera"]);
  addPrereq("Derecho comercial internacional", ["Derecho empresarial"]);
  addPrereq("Gestión aduanera y documental", ["Derecho empresarial"]);
  addPrereq("Ingles 3", ["Ingles 2"]);
  // 3º año
  addPrereq("Marketing internacional y global", ["Marketing operativo"]);
  addPrereq("Métodos cuantitativos", ["Estadística para los negocios"]);
  addPrereq("Gestión financiera", ["Contabilidad administrativa"]);
  addPrereq("Macroeconomía", ["Microeconomía"]);
  addPrereq("Ingles 4", ["Ingles 3"]);
  addPrereq("Finanzas corporativas", ["Gestión financiera"]);
  addPrereq("Negocios internacionales", ["Comercio internacional"]);
  addPrereq("Logística y seguros internacionales", ["Comercio internacional"]);
  addPrereq("Taller perfil uv 2", ["Taller perfil uv 1"]);
  addPrereq("Academic communicational english", ["Ingles 4"]);
  // 4º año
  addPrereq("Formación ciudadana global", ["Teoría del conflicto y negociación"]);
  addPrereq("Economía internacional", ["Macroeconomía"]);
  addPrereq("Taller perfil uv 3", ["Taller perfil uv 2"]);
  addPrereq("English for international managent", ["Academic communicational english"]);
  addPrereq("Integración comercial internacional", [
    "Negocios internacionales",
    "Logística y seguros internacionales"
  ]);
  addPrereq("Transporte y distribución internacional", [
    "Negocios internacionales",
    "Logística y seguros internacionales"
  ]);
  addPrereq("Finanzas internacionales", ["Finanzas corporativas"]);
  addPrereq("Análisis de entorno y coyuntura", ["Economía internacional"]);
  addPrereq("Seminario de título", [
    "Metodología de investigación de los negocios internacionales"
  ]);
  addPrereq("English for foreing trade", ["English for international managent"]);
  // 5º año
  addPrereq("Curso 2 de especialización", ["Curso 1 de especialización"]);

  // ------------------- Interfaz dinámica -----------------------------
  const mallaDiv = document.getElementById("malla");
  const completed = new Set();

  courses.forEach((name) => {
    const btn = document.createElement("button");
    const id = slug(name);
    btn.id = id;
    btn.textContent = name;
    btn.className = "course";

    // Deshabilitar los que tienen requisitos no cumplidos
    if (prereq[id] && prereq[id].length) {
      btn.disabled = true;
    }

    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      if (!completed.has(id)) {
        completed.add(id);
        btn.classList.add("completed");
        updateUnlocks();
      }
    });

    mallaDiv.appendChild(btn);
  });function updateUnlocks() {
    Object.keys(prereq).forEach((target) => {
      if (completed.has(target)) return; // Ya aprobado
      const requirements = prereq[target];
      const ready = requirements.every((r) => completed.has(r));
      const btn = document.getElementById(target);
      if (btn) btn.disabled = !ready;
    });
  }
});
