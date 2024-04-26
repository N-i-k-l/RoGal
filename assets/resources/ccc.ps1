# ���� � �����
$directoryPath = "C:\Users\USERRR\Documents\GitHub\RoGal\assets\resources"  # ������� ���� � ����� �����

# �������� ������ ������ � ����������� .prefab � ���������� ��������� Door_left ��� Door_right
$files = Get-ChildItem -Path $directoryPath -Filter *.prefab | Where-Object { $_.Name -match "Door_left|Door_right" }

# ������� ������ ��� �������� �������� ������
$fileNames = @()

# ���������� ������ ���� � ��������� ��� �������� � ������
foreach ($file in $files) {
    $fileNames += $file.Name
}

# ���������� �������� ������ � ���� prefab_files.txt
Set-Content -Path "prefab_files.txt" -Value ("[" + ($fileNames -join ", ") + "]")

Write-Host "�������� ������ �������� � prefab_files.txt"