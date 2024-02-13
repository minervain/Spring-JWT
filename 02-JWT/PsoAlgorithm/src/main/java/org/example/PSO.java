package org.example;

import java.util.Random;

class Particle {
    double[] position;
    double[] velocity;
    double[] bestPosition;
    double bestFitness;

    public Particle(int dimension) {
        position = new double[dimension];
        velocity = new double[dimension];
        bestPosition = new double[dimension];
        bestFitness = Double.MAX_VALUE;
    }
}

public class PSO {
    static final int SWARM_SIZE = 30;
    static final int MAX_ITERATION = 100;
    static final double C1 = 2.0; // cognitive coefficient
    static final double C2 = 2.0; // social coefficient
    static final double INERTIA = 1.0;
    static final double MIN_POSITION = -10.0;
    static final double MAX_POSITION = 10.0;
    static final int DIMENSION = 2;

    static double[] globalBestPosition;
    static double globalBestFitness;

    public static void main(String[] args) {
        Particle[] swarm = new Particle[SWARM_SIZE];
        initializeSwarm(swarm);

        for (int i = 0; i < MAX_ITERATION; i++) {
            updateGlobalBest(swarm);

            for (Particle particle : swarm) {
                updateVelocity(particle);
                updatePosition(particle);
                updatePersonalBest(particle);
            }
        }

        System.out.println("Global Best Fitness: " + globalBestFitness);
        System.out.println("Global Best Position:");
        for (int i = 0; i < DIMENSION; i++) {
            System.out.println(globalBestPosition[i]);
        }
    }

    static void initializeSwarm(Particle[] swarm) {
        globalBestPosition = new double[DIMENSION]; // globalBestPosition'ı başlat
        globalBestFitness = Double.MAX_VALUE; // globalBestFitness'ı başlat

        for (int i = 0; i < SWARM_SIZE; i++) {
            swarm[i] = new Particle(DIMENSION);
            for (int j = 0; j < DIMENSION; j++) {
                swarm[i].position[j] = getRandomPosition();
                swarm[i].velocity[j] = 0.0;
            }
        }
    }
    static double getRandomPosition() {
        return MIN_POSITION + (MAX_POSITION - MIN_POSITION) * Math.random();
    }

    static void updateVelocity(Particle particle) {
        for (int i = 0; i < DIMENSION; i++) {
            double cognitive = C1 * Math.random() * (particle.bestPosition[i] - particle.position[i]);
            double social = C2 * Math.random() * (globalBestPosition[i] - particle.position[i]);
            particle.velocity[i] = INERTIA * particle.velocity[i] + cognitive + social;
        }
    }

    static void updatePosition(Particle particle) {
        for (int i = 0; i < DIMENSION; i++) {
            particle.position[i] += particle.velocity[i];
            // Constrain position within bounds
            particle.position[i] = Math.max(Math.min(particle.position[i], MAX_POSITION), MIN_POSITION);
        }
    }

    static void updatePersonalBest(Particle particle) {
        double currentFitness = fitnessFunction(particle.position);
        if (currentFitness < particle.bestFitness) {
            particle.bestFitness = currentFitness;
            System.arraycopy(particle.position, 0, particle.bestPosition, 0, DIMENSION);
        }
    }

    static void updateGlobalBest(Particle[] swarm) {
        for (Particle particle : swarm) {
            if (particle.bestFitness < globalBestFitness) {
                globalBestFitness = particle.bestFitness;
                System.arraycopy(particle.bestPosition, 0, globalBestPosition, 0, DIMENSION);
            }
        }
    }

    // Example fitness function (2D Rastrigin function)
    static double fitnessFunction(double[] position) {
        double sum = 0;
        for (int i = 0; i < DIMENSION; i++) {
            sum += position[i] * position[i] - 10 * Math.cos(2 * Math.PI * position[i]);
        }
        return 10 * DIMENSION + sum;
    }
}
