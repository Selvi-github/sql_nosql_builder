$path = "c:/Users/lenovo/OneDrive/Desktop/sql-nosql-dashboard/my-dashboard/src/data/nosql/levels.js"
$content = Get-Content -Path $path -TotalCount 2487
$content += "];"
$content | Set-Content -Path $path -Encoding UTF8
