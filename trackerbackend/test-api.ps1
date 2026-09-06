$ErrorActionPreference = "Stop"

$baseUrl = "http://localhost:5000/api"
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$email = "crudtest$(Get-Date -Format 'yyyyMMddHHmmss')@example.com"
$password = "Password123"

function Call-Api {
  param(
    [string]$Method,
    [string]$Url,
    [hashtable]$Body
  )

  $parameters = @{
    Method = $Method
    Uri = $Url
    WebSession = $session
    ContentType = "application/json"
  }

  if ($Body) {
    $parameters.Body = ($Body | ConvertTo-Json)
  }

  return Invoke-RestMethod @parameters
}

Write-Host "1. Creating a test user..."
Call-Api "POST" "$baseUrl/users/signup" @{
  fullname = "CRUD Test User"
  email = $email
  password = $password
} | Out-Null

Write-Host "2. Logging in..."
Call-Api "POST" "$baseUrl/users/login" @{
  email = $email
  password = $password
} | Out-Null

Write-Host "3. Reading projects..."
$projectsBefore = Call-Api "GET" "$baseUrl/projects"
Write-Host "   Projects found: $($projectsBefore.projects.Count)"

Write-Host "4. Creating a project..."
$created = Call-Api "POST" "$baseUrl/projects" @{ name = "API Test Project" }
$projectId = $created.project._id
Write-Host "   Created project id: $projectId"

Write-Host "5. Updating the project..."
$updated = Call-Api "PUT" "$baseUrl/projects/$projectId" @{ status = "Done" }
Write-Host "   New status: $($updated.project.status)"

Write-Host "6. Deleting the project..."
Call-Api "DELETE" "$baseUrl/projects/$projectId" | Out-Null
Write-Host "   Project deleted"

Write-Host "CRUD API test passed." -ForegroundColor Green
Write-Host "Test user email: $email"
