import json, logging, random, time, datetime as dt, sys

class JsonFormatter(logging.Formatter):
    """Formateur qui sérialise le record en JSON compatible ECS."""
    def format(self, record):
        payload = {
            "@timestamp": dt.datetime.utcnow().isoformat(timespec="milliseconds") + "Z",
            "log.level": record.levelname.lower(),
            "message": record.getMessage(),
            "service.name": "app01",
            "event.dataset": "random_metrics",
            # --- métriques ou attributs arbitraires ---
            "metric.name": random.choice(["temperature", "latency", "cpu", "humidity"]),
            "metric.value": round(random.uniform(0, 100), 2),
            "metric.unit": random.choice(["°C", "ms", "%"]),
            "request.id": random.randint(1_000_000, 9_999_999),
        }
        return json.dumps(payload)

logger = logging.getLogger("random")
handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(JsonFormatter())
logger.addHandler(handler)
logger.setLevel(logging.INFO)

while True:
    logger.info("New random metric generated")
    time.sleep(5)           # 1 log toutes les 5 s
