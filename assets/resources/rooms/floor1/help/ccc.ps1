$files = Get-ChildItem -Path . -Filter *.prefab

# ������� ������ ��� �������� �������� ������
$fileNames = @()

# ���������� ������ ���� � ��������� ��� �������� � ������
foreach ($file in $files) {
    $fileNames += $file.Name
}

# ���������� �������� ������ � ���� prefab_files.txt
Set-Content -Path "prefab_files.txt" -Value ("['rooms/floor1/" + ($fileNames -join "','rooms/floor1/ ") + "]")
