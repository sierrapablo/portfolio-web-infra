variable "name" {
  description = "Nombre del contenedor Nginx"
  type        = string
}

variable "image_name" {
  description = "Nombre de la imagen Docker"
  type        = string
}

variable "build_context" {
  description = "Contexto de build de la imagen"
  type        = string
}

variable "dockerfile" {
  description = "Nombre del Dockerfile"
  type        = string
  default     = "Dockerfile"
}

variable "network_name" {
  description = "Nombre de la red Docker"
  type        = string
}

variable "volume_name" {
  description = "Nombre del volumen con contenido estático"
  type        = string
}

variable "restart_policy" {
  description = "Política de restart del contenedor"
  type        = string
  default     = "unless-stopped"
}

variable "host_path" {
  description = "Ruta del host para el volumen con contenido estático"
  type        = string
}
