$files = Get-ChildItem -Path . -Filter *.prefab

# Создаем массив для хранения названий файлов
$fileNames = @()

# Перебираем каждый файл и добавляем его название в массив
foreach ($file in $files) {
    $fileNames += $file.Name
}

# Записываем названия файлов в файл prefab_files.txt
Set-Content -Path "prefab_files.txt" -Value ("['rooms/floor1/" + ($fileNames -join "','rooms/floor1/ ") + "]")
