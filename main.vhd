library ieee;
use ieee.std_logic_1164.all;

entity main is
end entity;

architecture test of main is
    signal a : std_logic := '0';
    signal b : std_logic := '0';
    signal result : std_logic;
begin
    result <= a and b;

    process
    begin
        a <= '0'; b <= '0';
        wait for 10 ns;
        report "AND 0,0 = " & std_logic'image(result);

        a <= '0'; b <= '1';
        wait for 10 ns;
        report "AND 0,1 = " & std_logic'image(result);

        a <= '1'; b <= '1';
        wait for 10 ns;
        report "AND 1,1 = " & std_logic'image(result);

        report "VHDL test completed";
        std.env.stop;
        wait;
    end process;
end architecture;
