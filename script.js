import java.io.*;
import java.util.*;

public class QuizApp {
    private static final String SCORE_FILE = "score.txt";
    private static Map<Integer, String> sessionStorage = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Question> questions = Arrays.asList(
            new Question("What is the capital of France?", "Paris", "Berlin", "Madrid", "Rome"),
            new Question("What is 2 + 2?", "4", "3", "5", "6"),
            new Question("Which planet is known as the Red Planet?", "Mars", "Earth", "Jupiter", "Venus"),
            new Question("Who wrote 'To Kill a Mockingbird'?", "Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"),
            new Question("What is the largest ocean on Earth?", "Pacific", "Atlantic", "Indian", "Arctic")
        );
        
        loadSession();
        int score = 0;
        
        for (int i = 0; i < questions.size(); i++) {
            Question q = questions.get(i);
            System.out.println((i + 1) + ". " + q.getQuestion());
            for (int j = 0; j < q.getOptions().length; j++) {
                System.out.println((char)('A' + j) + ". " + q.getOptions()[j]);
            }
            
            System.out.print("Your answer: ");
            String answer = scanner.nextLine().toUpperCase();
            sessionStorage.put(i, answer);
        }
        
        for (int i = 0; i < questions.size(); i++) {
            if (sessionStorage.get(i) != null && 
                sessionStorage.get(i).equalsIgnoreCase(questions.get(i).getCorrectAnswerLetter())) {
                score++;
            }
        }
        
        System.out.println("Your score is " + score + " out of " + questions.size());
        saveScore(score);
    }
    
    private static void loadSession() {
        sessionStorage.clear();
    }
    
    private static void saveScore(int score) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(SCORE_FILE))) {
            writer.write("Last Score: " + score);
        } catch (IOException e) {
            System.out.println("Error saving score.");
        }
    }
}

class Question {
    private String question;
    private String[] options;
    private String correctAnswer;
    
    public Question(String question, String correctAnswer, String... options) {
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.options = options;
    }
    
    public String getQuestion() {
        return question;
    }
    
    public String[] getOptions() {
        return options;
    }
    
    public String getCorrectAnswerLetter() {
        for (int i = 0; i < options.length; i++) {
            if (options[i].equals(correctAnswer)) {
                return Character.toString((char)('A' + i));
            }
        }
        return "";
    }
}
