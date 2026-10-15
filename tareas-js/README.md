# tareas-js

App de tareas por consola en JavaScript, hecha para practicar programación orientada a objetos y módulos ES.

## Estructura

```text
src/
├── index.js   punto de entrada: demo
├── tarea.js   clases Tarea (default) y TareaConFecha
├── lista.js   clase ListaTareas con campo privado #tareas
└── utils.js   formatearFecha y capitalizar
```

## Cómo ejecutarlo

```bash
npm install
npm start      # ejecuta la demo
npm run dev    # se reinicia al guardar cambios
```

## Qué practiqué

- Clases, herencia, getters, miembros estáticos y campos privados
- Módulos ES: exportaciones por defecto y con nombre
- npm: dependencias (chalk) y scripts
- Manejo de errores con throw y try/catch
