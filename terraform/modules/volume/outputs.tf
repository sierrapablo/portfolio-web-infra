output "name" {
  description = "Nombre del volumen Docker"
  value       = docker_volume.this.name
}

output "mountpoint" {
  description = "Ruta del volumen en el host"
  value       = docker_volume.this.mountpoint
}
