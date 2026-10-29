class Main {
    static function main() {
        trace("Hello from Haxe!");

        var a:Int = 10;
        var b:Int = 20;

        trace("Addition: " + (a + b));
        trace("Multiplication: " + (a * b));

        for (i in 1...6) {
            trace("Number: " + i);
        }
    }
}
