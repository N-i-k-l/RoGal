# Путь к папке
$directoryPath = "C:\Users\USERRR\Documents\GitHub\RoGal\assets\resources"  # Укажите путь к вашей папке

# Получаем список файлов с расширением .prefab и содержащих подстроки Door_left или Door_right
$files = Get-ChildItem -Path $directoryPath -Filter *.prefab | Where-Object { $_.Name -match "Door_left|Door_right" }

# Создаем массив для хранения названий файлов
$fileNames = @()

# Перебираем каждый файл и добавляем его название в массив
foreach ($file in $files) {
    $fileNames += $file.Name
}

# Записываем названия файлов в файл prefab_files.txt
Set-Content -Path "prefab_files.txt" -Value ("[" + ($fileNames -join ", ") + "]")

Write-Host "Названия файлов записаны в prefab_files.txt"