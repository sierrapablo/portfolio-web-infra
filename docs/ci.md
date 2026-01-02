# CI/CD Pipelines with Jenkins

This directory contains the Jenkinsfiles used to manage the lifecycle of the infrastructure. All pipelines are designed to run on a Jenkins node with the necessary tools installed (Terraform, Sonar-scanner, etc.).

## Table of Contents

- [Release Pipeline (`release.Jenkinsfile`)](#release-pipeline-releasejenkinsfile)
- [Deploy Pipeline (`deploy.Jenkinsfile`)](#deploy-pipeline-deployjenkinsfile)
- [Format & Validate Pipeline (`format.Jenkinsfile`)](#format--validate-pipeline-formatjenkinsfile)
- [SonarQube Analysis (`sonarqube.Jenkinsfile`)](#sonarqube-analysis-sonarqubejenkinsfile)

---

## Pipelines

### 1. Release Pipeline (`release.Jenkinsfile`)

Automates the **Gitflow** release process. It handles versioning, branch management, and tagging.

- **Trigger**: Manual.
- **Parameters**:
  - `BUMP`: Level of semantic version to increment (`X`: Major, `Y`: Minor, `Z`: Patch).
- **Workflow**:
  1.  Reads `VERSION` file.
  2.  Creates `release/x.y.z` branch from `develop`.
  3.  Updates `VERSION` file and commits.
  4.  Merges to `main` and tags the release.
  5.  Merges back to `develop` and deletes the release branch.

### 2. Deploy Pipeline (`deploy.Jenkinsfile`)

Handles the deployment of a specific version (tag) to the AWS infrastructure.

- **Trigger**: Manual.
- **Parameters**:
  - `TAG`: Selects the Git tag to be deployed.
- **Workflow**:
  1.  Checkouts the selected tag.
  2.  `terraform init`
  3.  `terraform plan`
  4.  **Manual Approval**: Wait for user confirmation.
  5.  `terraform apply -auto-approve`

### 3. Format & Validate Pipeline (`format.Jenkinsfile`)

Ensures code consistency and basic syntax correctness.

- **Trigger**: Manual or Pull Request/Push (depending on Jenkins configuration).
- **Parameters**:
  - `BRANCH_NAME`: Branch to format and validate.
- **Workflow**:
  1.  `terraform fmt` (automatically fixes formatting).
  2.  `terraform validate`.
  3.  Pushes changes back to the repository if any formatting fix was applied.

### 4. SonarQube Analysis (`sonarqube.Jenkinsfile`)

Performs static code analysis to detect vulnerabilities, security hotspots, and code smells.

- **Trigger**: Manual or scheduled.
- **Parameters**:
  - `BRANCH_NAME`: Branch to analyze.
- **Workflow**:
  1.  Detects current version.
  2.  Runs `sonar-scanner` pointing to `sonar.sierrapablo.dev`.
  3.  Reports results to the SonarQube dashboard.

---

## Prerequisites for Jenkins

- **Environment**: Jenkins node with `terraform` and `sonar-scanner`.
- **Credentials**:
  - `github`: SSH credentials to push/pull from the repository.
  - `github-repo-pat`: A GitHub Personal Access Token used to create releases via the GitHub API.
  - `sonarqube`: Token for authentication with the SonarQube server.
- **Files**:
  - A `VERSION` file must exist in the root for the release pipeline.
