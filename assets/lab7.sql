CREATE FUNCTION kvr(a numeric, b numeric, c numeric) RETURNS SETOF numeric AS
$$
DECLARE
    disc numeric;
    root1 numeric;
    root2 numeric;
BEGIN
    disc := b*b - 4*a*c;
    IF disc > 0 THEN
        root1 := (-b + sqrt(disc)) / (2*a);
        root2 := (-b - sqrt(disc)) / (2*a);
        RETURN NEXT root1;
        RETURN NEXT root2;
    ELSIF disc = 0 THEN
        root1 := -b / (2*a);
        RETURN NEXT root1;
    ELSE
        RETURN;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE VIEW flights_v --Создание view flights_v
AS -- Указание на то что содержит view
SELECT id,-- выборка id 
 (SELECT name-- начало подзапроса с выборкой name
 FROM airports -- указание на то что вывод производится из airports
 WHERE code = airport_from) -- условие: вывод производится только тогда когда code = airport_from, конец подзапроса
 airport_from, -- вывод исходного аиропорта
 (SELECT name--начало подзапроса с выборкой name
 FROM airports-- Вывод производится из таблицы airports
 WHERE code = airport_to) -- Условие: вывод производится только тогда когда code = airport_to, конец подзапроса
 airport_to-- Вывод конечного аиропорта
FROM flights;-- Вывод производится из таблицы flights

CREATE OR REPLACE FUNCTION flights_v_update()  -- Создание или замена функции с именем flights_v_update
RETURNS trigger  -- Определение типа возвращаемого значения 
AS-- Указание на то что содержит
$BODY$-- Открытие тела функции
DECLARE  -- начало блока переменных
code_to char(3);  -- Объявление переменной code_to типа char с длиной 3 символа
BEGIN  -- Начало блока выполнения
 BEGIN  -- Начало вложенного блока выполнения
 SELECT code INTO STRICT code_to  -- Выборка значения code и помещение его в переменную code_to
 FROM airports  -- указание на то что вывод производится из airports
 WHERE name = NEW.airport_to;  -- Условие: значение столбца name равно значению NEW.airport_to
 EXCEPTION  -- Обработка исключений
 WHEN no_data_found THEN  -- При возникновении исключения отсутствия данных
 RAISE EXCEPTION 'Аэропорт % отсутствует',  -- Генерация исключения
 NEW.airport_to;  -- значение NEW.airport_to
 END;  -- Конец вложенного блока
 UPDATE flights  -- Обновление таблицы flights
 SET airport_to = code_to  -- Установка значения столбца airport_to равным переменной code_to
 WHERE id = OLD.id;  -- Условие: значение столбца id равно значению OLD.id
 RETURN NEW;  -- Возврат измененной строки
END;  -- Конец блока выполнения
$BODY$ -- закрытие тела функции
LANGUAGE plpgsql;  -- Указание языка функции

CREATE TRIGGER flights_v_upd_trigger  -- Создание триггера с именем flights_v_upd_trigger
INSTEAD OF  -- Триггер будет выполняться вместо
UPDATE  -- операции UPDATE
ON flights_v  -- Триггер применяется к flights_v
FOR EACH ROW  -- Для каждой строки
EXECUTE FUNCTION flights_v_update();  -- Выполнение функции flights_v_update

SELECT * from "Transaction deniaed" 

CREATE TRIGGER test1 
BEFORE DELETE
ON aircrafts For EACH ROW EXECUTE FUNCTION rrrr();

CREATE or REPLACE FUNCTION candl() 
RETURN trigger 
AS 
$BODY$ 
BEGIN
	RAISE EXCEPTION "DENIED";
	Transaction ROLLBACK;
	RETURN NULL;
END;
$BODY$ 
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION rrrr()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'Transaction canceled by trigger';
END;
$$ LANGUAGE plpgsql;
||

CREATE TABLE bookings.flights_history (
    flight_id INT,
    flight_no VARCHAR(6),
    operation VARCHAR(10),
    date_operation DATE,
    time_operation TIME
);

CREATE OR REPLACE FUNCTION savee()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO flights_history (flight_id, flight_no, operation, date_operation, time_operation)
    VALUES (OLD.flight_id, OLD.flight_no, 'UPDATE', CURRENT_DATE, CURRENT_TIME);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER saveet
BEFORE UPDATE ON flights
FOR EACH ROW
EXECUTE FUNCTION savee();

CREATE OR REPLACE FUNCTION saveed()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO flights_history (flight_id, flight_no, operation, date_operation, time_operation)
    VALUES (OLD.flight_id, OLD.flight_no, 'DELETE', CURRENT_DATE, CURRENT_TIME);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER saveedt
BEFORE DELETE ON flights
FOR EACH ROW
EXECUTE FUNCTION saveed();


CREATE OR REPLACE FUNCTION prevenDelete()
RETURNS TRIGGER AS $$
DECLARE
    ticket_count INT;
BEGIN
    SELECT COUNT(*)
    INTO ticket_count
    FROM boarding_passes bp
    JOIN ticket_flights tf ON bp.ticket_no = tf.ticket_no
    JOIN flights f ON tf.flight_id = f.flight_id
    JOIN aircrafts a ON f.aircraft_code = a.aircraft_code
    JOIN seats s ON a.aircraft_code = s.aircraft_code
    WHERE s.seat_no = OLD.seat_no;
    IF ticket_count > 0 THEN
        RAISE EXCEPTION 'Невозможно удалить место, на него были выданы посадочные талоны.';
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tprevdelete
BEFORE DELETE ON seats
FOR EACH ROW
EXECUTE FUNCTION prevenDelete();

CREATE OR REPLACE FUNCTION check_price_change()
RETURNS TRIGGER AS $$
BEGIN
    IF ABS(NEW.amount - OLD.amount) > (0.1 * OLD.amount) THEN
        RAISE EXCEPTION 'Невозможно удалить место, на него были выданы посадочные талоны.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_check_price_change
BEFORE UPDATE OF amount ON ticket_flights
FOR EACH ROW
EXECUTE FUNCTION check_price_change();

CREATE OR REPLACE FUNCTION zaizevNet()
RETURNS TRIGGER AS $$
DECLARE
    ticket_count INT;
BEGIN
    SELECT COUNT(*)
    INTO ticket_count
    FROM boarding_passes bp
    JOIN ticket_flights tf ON bp.ticket_no = tf.ticket_no
    WHERE tf.ticket_no = NEW.bp.ticket_no;
    IF ticket_count = 0 THEN
        RAISE EXCEPTION 'Безбилетник!';
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_wrongPlane
BEFORE insert ON ticket_flights
FOR EACH ROW
EXECUTE FUNCTION zaizevNet();