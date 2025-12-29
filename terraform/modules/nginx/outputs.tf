output "container_name" {
  description = "Nombre del contenedor Nginx"
  value       = docker_container.this.name
}

output "container_id" {
  description = "ID del contenedor Nginx"
  value       = docker_container.this.id
}

output "image_name" {
  description = "Nombre de la imagen Docker"
  value       = docker_image.this.name
}
