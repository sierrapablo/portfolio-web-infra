variable "name" {
  description = "Nombre del volumen Docker"
  type        = string
}

variable "driver" {
  description = "Driver del volumen Docker"
  type        = string
  default     = "local"
}

variable "labels" {
  description = "Labels aplicadas al volumen"
  type        = map(string)
  default     = {}
}
