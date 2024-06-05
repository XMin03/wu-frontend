export interface FaseEstudiante {
  id:number,
  preguntas:PreguntaEstudiante[]
}
export interface PreguntaEstudiante {
  id:number,
  enunciado:string;
  respuestas:RespuestaEstudiante[]
}
export interface RespuestaEstudiante {
  id:number,
  respuesta:string;
}
