variable "project_name" {
  description = "Nombre del proyecto"
  type        = string
  default     = "portfolio-web-infra"
}

variable "environment" {
  description = "Entorno de despliegue"
  type        = string
  default     = "prod"
}

variable "reverse_proxy_network_name" {
  description = "Nombre de la red del reverse proxy"
  type        = string
  default     = "reverse-proxy"
}

variable "reverse_proxy_network_external" {
  description = "Indica si la red del reverse proxy es externa"
  type        = bool
  default     = true
}

variable "portfolio_dist_volume_name" {
  description = "Nombre del volumen de la distribución del portfolio"
  type        = string
  default     = "portfolio-web-dist"
}

variable "nginx_name" {
  description = "Nombre del contenedor del nginx"
  type        = string
  default     = "nginx"
}

variable "nginx_image_name" {
  description = "Nombre de la imagen del nginx"
  type        = string
  default     = "portfolio-web-nginx:latest"
}

variable "nginx_build_context" {
  description = "Contexto de construcción del nginx"
  type        = string
  default     = ".."
}

variable "nginx_internal_port" {
  description = "Puerto interno del nginx"
  type        = number
  default     = 4321
}

variable "nginx_external_port" {
  description = "Puerto externo del nginx"
  type        = number
  default     = 4321
}
