# Infrastructure as Code with Terraform

Template for IaC with Terraform

[![Latest Release](https://img.shields.io/github/v/release/sierrapablo/portfolio-web-infra?logo=github&style=flat-square)](https://github.com/sierrapablo/portfolio-web-infra/releases)
[![Stars](https://img.shields.io/github/stars/sierrapablo/portfolio-web-infra?logo=github&style=flat-square)](https://github.com/sierrapablo/portfolio-web-infra/stargazers)
[![Jenkins](https://img.shields.io/badge/CI-Jenkins-blue?logo=jenkins&style=flat-square)](https://jenkins.sierrapablo.dev/job/portfolio-web/job/portfolio-web-infra-docker/job/portfolio-web-infra-docker-format/)
[![SonarQube](https://img.shields.io/badge/Quality%20Gate-SonarQube-brightgreen?logo=sonarqube&style=flat-square)](https://sonar.sierrapablo.dev/dashboard?id=sierrapablo-portfolio-web-infra)

> **🚧 Active Development**: This project is currently under active construction. Features, modules, and architecture are evolving and are subject to change.

## Overview

This repository contains the infrastructure definition for the Portfolio Web project, managed with Terraform and automated via Jenkins pipelines.

## Repository Structure

The project is organized into several key directories:

| Directory                | Description                                                                                 | Documentation                                     |
| ------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **`terraform/`**         | The core infrastructure definition, including the `main` configuration and provider setups. | [View Documentation](./docs/terraform.md)         |
| **`terraform/modules/`** | Reusable, self-contained Terraform modules.                                                 | [View Documentation](./docs/terraform-modules.md) |
| **`ci/`**                | Jenkins pipelines managing the lifecycle: format, validate, sonarqube, and release.         | [View Documentation](./docs/ci.md)                |

### Features

- **Modular Architecture**: Leveraging Terraform modules to create reusable components.
- **Automated Quality Checks (via Jenkins)**:
  - **Validation & Formatting**: `format.Jenkinsfile` ensures Terraform syntax and style consistency.
  - **Code Quality**: `sonarqube.Jenkinsfile` performs static analysis of the infrastructure code.
- **Continuous Deployment**:
  - `deploy.Jenkinsfile` handles automated infrastructure provisioning.
- **Release Automation**:
  - **Gitflow Strategy**: Automated version bumping, tagging, and branch synchronization using `release.Jenkinsfile`.

### Jenkins Pipelines

The repository includes several pipelines to manage the infrastructure:

- **Format**: [format.Jenkinsfile](./ci/format.Jenkinsfile) - Runs `terraform fmt` and `terraform validate`.
- **SonarQube**: [sonarqube.Jenkinsfile](./ci/sonarqube.Jenkinsfile) - Scans for issues and vulnerabilities.
- **Release**: [release.Jenkinsfile](./ci/release.Jenkinsfile) - Automates the release lifecycle. [View Documentation](./docs/ci.md).
- **Deploy**: [deploy.Jenkinsfile](./ci/deploy.Jenkinsfile) - Deploys infrastructure to AWS.

## Credits

**Pablo Sierra** - _Initial work & Maintenance_ - [sierrapablo](https://github.com/sierrapablo)

## License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.
