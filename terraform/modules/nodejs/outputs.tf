output "container_name" {
  description = "Nombre del contenedor Node.js"
  value       = docker_container.this.name
}

output "container_id" {
  description = "ID del contenedor Node.js"
  value       = docker_container.this.id
}

output "image_name" {
  description = "Nombre de la imagen Docker"
  value       = docker_image.this.name
}
